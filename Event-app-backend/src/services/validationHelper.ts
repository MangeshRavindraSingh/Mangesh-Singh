import mongoose from 'mongoose';

const validateName = (input: String): boolean => {
  // Validate name
  if (!input || typeof input !== "string") {
    return false;
  }

  return true;
};

const isFutureOrToday = (date: string): boolean => {
    const inputDate = new Date(date);
    const today = new Date();
  
    //  To ignore the time part for comparison
    today.setHours(0, 0, 0, 0);
  
    return inputDate >= today;
  };

const validateDates = (dates: string[]): boolean => {
  // Validate date format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  for (const date of dates) {
    if (!dateRegex.test(date)) {
      return false;
    }

    // check if the date is valid i.e not a past date
    if (!isFutureOrToday(date)) {
      return false;
    }
  }

  return true;
};

const validateMongoId = (id: string): boolean => {
    return mongoose.isValidObjectId(id);
  };

export default { validateName, validateDates, validateMongoId };
