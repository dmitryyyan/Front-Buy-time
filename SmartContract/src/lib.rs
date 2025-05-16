use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::msg;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{clock::Clock, rent::Rent, Sysvar},
};

// Booking status enum
#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub enum BookingStatus {
    Booked,
    CancelledByStudent,
    CancelledByExpert,
    Confirmed,
}

// Booking account state structure
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct BookingAccount {
    pub student: Pubkey,
    pub expert: Pubkey,
    pub amount: u64,
    pub meeting_time: i64,
    pub status: BookingStatus,
}

// Program instructions
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum BookingInstruction {
    CreateBooking { amount: u64, meeting_time: i64 },
    StudentCancel,
    ExpertCancel,
    ConfirmMeeting { passed: bool },
}

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Deserialize instruction
    let instruction = BookingInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        BookingInstruction::CreateBooking { amount, meeting_time } => {
            process_create_booking(program_id, accounts, amount, meeting_time)
        }
        BookingInstruction::StudentCancel => process_student_cancel(program_id, accounts),
        BookingInstruction::ExpertCancel => process_expert_cancel(program_id, accounts),
        BookingInstruction::ConfirmMeeting { passed } => {
            process_confirm_meeting(program_id, accounts, passed)
        }
    }
}

fn process_create_booking(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
    meeting_time: i64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let student_account = next_account_info(account_info_iter)?;
    let expert_account = next_account_info(account_info_iter)?;
    let escrow_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    // Ensure student signed
    if !student_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Derive PDA and bump
    let (pda, bump) = Pubkey::find_program_address(
        &[b"booking", student_account.key.as_ref(), expert_account.key.as_ref(), &meeting_time.to_le_bytes()],
        program_id,
    );
    if pda != *escrow_account.key {
        return Err(ProgramError::InvalidArgument);
    }

    // Prepare seeds
    let seeds = &[
        b"booking".as_ref(),
        student_account.key.as_ref(),
        expert_account.key.as_ref(),
        &meeting_time.to_le_bytes(),
        &[bump],
    ];

    // Allocate and fund account
    let space: u64 = 81; 
    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(space as usize);
    let create_ix = system_instruction::create_account(
        student_account.key,
        escrow_account.key,
        rent_lamports + amount,
        space,
        program_id,
    );
    invoke_signed(
        &create_ix,
        &[student_account.clone(), escrow_account.clone(), system_program.clone()],
        &[seeds],
    )?;

    // Initialize booking state
    let booking = BookingAccount {
        student: *student_account.key,
        expert: *expert_account.key,
        amount,
        meeting_time,
        status: BookingStatus::Booked,
    };
    booking.serialize(&mut &mut escrow_account.data.borrow_mut()[..])?;

    Ok(())
}

fn process_student_cancel(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let student_account = next_account_info(account_info_iter)?;
    let escrow_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;

    // Ensure student signed
    if !student_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Validate PDA owner and data length
    if escrow_account.owner != program_id {
        return Err(ProgramError::IllegalOwner);
    }
    

    // Deserialize booking
    let mut booking = BookingAccount::try_from_slice(&escrow_account.data.borrow())
        .map_err(|_| ProgramError::InvalidAccountData)?;
    if booking.status != BookingStatus::Booked || booking.student != *student_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    // Derive PDA seeds
    let (pda, bump) = Pubkey::find_program_address(
        &[b"booking", booking.student.as_ref(), booking.expert.as_ref(), &booking.meeting_time.to_le_bytes()],
        program_id,
    );
    let seeds = &[
        b"booking".as_ref(),
        booking.student.as_ref(),
        booking.expert.as_ref(),
        &booking.meeting_time.to_le_bytes(),
        &[bump],
    ];

    // Compute refund amount
    let now = Clock::get()?.unix_timestamp;
    let delta = booking.meeting_time - now;
    let refund = if delta > 48 * 3600 {
        booking.amount
    } else if delta > 24 * 3600 {
        booking.amount / 2
    } else {
        0
    };

    // Update status and write back
    booking.status = BookingStatus::CancelledByStudent;
    booking.serialize(&mut &mut escrow_account.data.borrow_mut()[..])?;

    // Execute refund if due
    // if refund > 0 {
    //     let ix = system_instruction::transfer(&pda, &student_account.key, refund);
    //     invoke_signed(
    //         &ix,
    //         &[escrow_account.clone(), student_account.clone(), system_program.clone()],
    //         &[seeds],
    //     )?;
    // }
    if refund > 0 {
        msg!("Refunding {} lamports to student", refund);

        // These borrows yield RefMut<&mut u64>
        let mut escrow_lamports  = escrow_account.lamports.borrow_mut();
        let mut student_lamports = student_account.lamports.borrow_mut();

        // *borrows once -> &mut u64, so **borrows twice -> u64
        if **escrow_lamports < refund {
            return Err(ProgramError::InsufficientFunds);
        }

        **escrow_lamports  -= refund;
        **student_lamports += refund;
    }



    Ok(())
}

fn process_expert_cancel(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let expert_account  = next_account_info(account_info_iter)?;
    let escrow_account  = next_account_info(account_info_iter)?;
    let student_account = next_account_info(account_info_iter)?;
    let _system_program = next_account_info(account_info_iter)?; // no longer needed 

    // check if expert is the signer
    if !expert_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Deserialize booking
    let mut booking = BookingAccount::try_from_slice(&escrow_account.data.borrow())
        .map_err(|_| ProgramError::InvalidAccountData)?;
    if booking.status != BookingStatus::Booked || booking.expert != *expert_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    // Update account status
    booking.status = BookingStatus::CancelledByExpert;
    booking.serialize(&mut &mut escrow_account.data.borrow_mut()[..])?;

    // In-program refund using double dereferencing (workaround??)
    msg!("Expert cancel: refunding {} lamports to student", booking.amount);
    let mut escrow_lamports  = escrow_account.lamports.borrow_mut();   // RefMut<&mut u64>
    let mut student_lamports = student_account.lamports.borrow_mut();  // RefMut<&mut u64>

    // * -> &mut u64, ** -> u64
    if **escrow_lamports < booking.amount {
        return Err(ProgramError::InsufficientFunds);
    }
    **escrow_lamports  -= booking.amount;
    **student_lamports += booking.amount;

    Ok(())
}

fn process_confirm_meeting( // logic is incomplete
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    passed: bool,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let oracle_account = next_account_info(account_info_iter)?;
    let escrow_account = next_account_info(account_info_iter)?;
    let student_account = next_account_info(account_info_iter)?;
    let expert_account  = next_account_info(account_info_iter)?;
    let _system_program = next_account_info(account_info_iter)?; // no longer needed 

    // Oracle is the signer
    if !oracle_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Deserialize booking
    let mut booking = BookingAccount::try_from_slice(&escrow_account.data.borrow())
        .map_err(|_| ProgramError::InvalidAccountData)?;
    if booking.status != BookingStatus::Booked {
        return Err(ProgramError::InvalidAccountData);
    }

    // Update status
    booking.status = BookingStatus::Confirmed;
    booking.serialize(&mut &mut escrow_account.data.borrow_mut()[..])?;

    msg!(
        "Confirm meeting: transferring {} lamports to expert {}",
        booking.amount,
        expert_account.key
    );

    let mut escrow_lamports  = escrow_account.lamports.borrow_mut();   // RefMut<&mut u64>
    let mut expert_lamports  = expert_account.lamports.borrow_mut();   // RefMut<&mut u64>

    if **escrow_lamports < booking.amount {
        return Err(ProgramError::InsufficientFunds);
    }

    **escrow_lamports  -= booking.amount;
    **expert_lamports  += booking.amount;

    Ok(())
}