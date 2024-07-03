import { AppDataSource } from "../data-source";
export const connect = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected.");
  } catch (error) {
    console.log(error);
  }
};

export const close = async (): Promise<void> => {
  try {
    await AppDataSource.destroy();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Failed to close database connection:", error);
  }
};
