
import time
import tkinter as tk
from tkinter import messagebox
import sqlite3
# import smtplib
import webbrowser
import re

# List of tables
tables = ["Client", "Providers", "Potential"]

# Create the database and update the tables list


def get_user_info():
    name = name_entry.get()
    email = email_entry.get()
    table = table_var.get()
    if is_valid_email(email):
        save_to_db(name, email, table)
    else:
        messagebox.showerror("Error", "Invalid email address.")


def save_to_db(name, email, table):
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    c.execute(f"CREATE TABLE IF NOT EXISTS {table} (name TEXT, email TEXT)")
    c.execute(f"INSERT INTO {table} VALUES (?, ?)", (name, email))
    conn.commit()
    messagebox.showinfo("Success", "Information saved to database.")
    conn.close()
    show_data()

# Check if the email address is valid


def is_valid_email(email):
    # The regular expression pattern for an email address
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    if re.match(pattern, email):
        return True
    return False


# Create the GUI
root = tk.Tk()
root.geometry("400x900")

table_label = tk.Label(root, text="Select the Table:")
table_var = tk.StringVar(value=tables[0])
table_var.set(tables[0])
table_select = tk.OptionMenu(root, table_var, *tables)
table_select.pack()

name_label = tk.Label(root, text="Name:")
name_label.pack()
name_entry = tk.Entry(root)
name_entry.pack()

email_label = tk.Label(root, text="Email:")
email_label.pack()
email_entry = tk.Entry(root)
email_entry.pack()

submit_button = tk.Button(root, text="Submit", command=lambda: get_user_info())
submit_button.pack()


def send_emails(table, subject):
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    c.execute(f"SELECT email FROM {table}")
    emails = c.fetchall()

    # Construct the URL for the Gmail compose window
    to = ",".join([email[0] for email in emails])
    url = f"https://mail.google.com/mail/?view=cm&fs=1&to={to}&su={subject}&body="
    webbrowser.open(url)
    messagebox.showinfo("Success", "Gmail compose window opened.")
    conn.close()


data_text = None


def show_data():
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    table = table_var.get()
    c.execute(f"SELECT * FROM {table}")
    data = c.fetchall()
    message = "Name\tEmail\n"
    for row in data:
        message += row[0] + "\t" + row[1] + "\n"
    global data_text
    if data_text is None:
        data_text = tk.Text(root)
        data_text.pack(expand=True, fill='both')
    else:
        data_text.delete("1.0", tk.END)
    data_text.insert(tk.INSERT, message)
    conn.close()


def delete_data():
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    table = table_var.get()
    c.execute(f"DELETE FROM {table}")
    conn.commit()
    messagebox.showinfo("Success", "All data deleted.")
    conn.close()
    show_data()


show_data_button = tk.Button(root, text="Show Data", command=show_data)
show_data_button.pack()

delete_button = tk.Button(root, text="Delete Data", command=delete_data)
delete_button.pack()

subject_label = tk.Label(root, text="Subject:")
subject_label.pack()
subject_entry = tk.Entry(root)
subject_entry.pack()
send_email_button = tk.Button(
    root, text="Send Email", command=lambda: send_emails(table_var.get(), subject_entry.get()))
send_email_button.pack()

root.mainloop()


# def send_emails(table, subject, body):
#     conn = sqlite3.connect('user_info.db')
#     c = conn.cursor()
#     c.execute(f"SELECT email FROM {table}")
#     emails = c.fetchall()

#     server = smtplib.SMTP('smtp.gmail.com', 587)
#     server.starttls()
#     server.login("YourEmailAddress@gmail.com", "YourEmailPassword")

#     for email in emails:
#         email = email[0]
#         message = f"Subject: {subject}\n\n{body}"
#         server.sendmail("YourEmailAddress@gmail.com", email, message)

#     messagebox.showinfo("Success", "Emails sent to all addresses in the table.")
#     server.quit()
