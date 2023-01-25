import sqlite3
import tkinter as tk
import re
from tkinter import messagebox

def save_to_db(name, email):
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS user_info (name TEXT, email TEXT)")
    c.execute("INSERT INTO user_info VALUES (?, ?)", (name, email))
    conn.commit()
    messagebox.showinfo("Success", "Information saved to database.")
    conn.close()


def is_valid_email(email):
    # The regular expression pattern for an email address
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    if re.match(pattern, email):
        return True
    return False

def get_user_info():
    name = name_entry.get()
    email = email_entry.get()
    if is_valid_email(email):
        save_to_db(name, email)
    else:
        messagebox.showerror("Error", "Invalid email address.")



root = tk.Tk()
root.geometry("400x550")

name_label = tk.Label(root, text="Name:")
name_label.pack()
name_entry = tk.Entry(root)
name_entry.pack()

email_label = tk.Label(root, text="Email:")
email_label.pack()
email_entry = tk.Entry(root)
email_entry.pack()

submit_button = tk.Button(root, text="Submit", command=get_user_info)
submit_button.pack()

def show_data():
    conn = sqlite3.connect('user_info.db')
    c = conn.cursor()
    c.execute("SELECT * FROM user_info")
    data = c.fetchall()
    message = "Name\tEmail\n"
    for row in data:
        message += row[0] + "\t" + row[1] + "\n"
    data_text = tk.Text(root)
    data_text.insert(tk.INSERT, message)
    data_text.pack(expand=True, fill='both')
    conn.close()
    data_text.config(width=800, height=200)

show_data_button = tk.Button(root, text="Show Data", command=show_data)
show_data_button.pack()


root.mainloop()
