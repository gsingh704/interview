package program;

import java.util.Scanner;

public class Validate {
    public static Scanner input = new Scanner(System.in);

    public static int getOption(int i, int j) {
        int choice = Validate.getValidINT();
        while (choice < i || choice > j) {
            System.out.println("Invalid option, Try again");
            choice = Validate.getValidINT();
        }
        return choice;

    }

    public static int getValidINT() {
        // ask the user for a number and validate it
        int number = 0;
        boolean isValid = false;
        do {
            try {

                number = input.nextInt();

                isValid = true;
            } catch (NumberFormatException e) {
                System.out.println("It has to be a number");
            }
        } while (!isValid);
        return number;
    }

    public static int getExistingId(Object[][] array) {
        // existing id
        int id;
        boolean exist;
        do {
            id = getValidINT();
            exist = false;
            for (int i = 0; i < array.length; i++) {
                if (id == (int) array[i][0]) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                System.out.println("The id does not exist, enter another id: ");
            }
        } while (!exist);
        return id;

    }

    public static int getPos(Object[][] array, int id) {
        int pos = -1;
        for (int j = 0; j < array.length; j++) {
            if (id == (int) array[j][0]) {
                pos = j;
                return pos;
            }
        }
        return pos;
    }

    public static int getNoExistID(Object[][] array) {
        int id;
        boolean exist;
        do {
            id = getValidINT();
            exist = false;
            for (int i = 0; i < array.length; i++) {
                if (id == (int) array[i][0]) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                System.out.println("The id already exist, enter another id: ");
            }
        } while (exist);
        return id;
    }

    public static String getName() {
        String Value = input.next();
        while (!Value.matches("[a-zA-Z]+")) {
            System.out.println("Invalid Value, try again");
            Value = input.next();
        }
        return Value;
    }

    public static String getEmail() {
        String email = input.next();
        while (!email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")) {
            System.out.println("Invalid email, try again");
            email = input.next();
        }
        return email;
    }

}
