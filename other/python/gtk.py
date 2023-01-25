import sqlite3
import webbrowser
from gi.repository import Gtk
import re
import gi
gi.require_version('Gtk', '3.0')

# List of tables
tables = ["Client", "Providers", "Potential"]


class UserInfoWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="User Information")
        self.set_border_width(10)
        
        # Create a vertical box to hold all the widgets
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)
        

        # Create a label and dropdown for table selection
        table_label = Gtk.Label("Select the Table:")
        vbox.pack_start(table_label, True, True, 0)
        self.table_combo = Gtk.ComboBoxText()
        self.table_combo.set_entry_text_column(0)
        for table in tables:
            self.table_combo.append_text(table)
        self.table_combo.set_active(0)
        vbox.pack_start(self.table_combo, True, True, 0)
        self.table_combo.connect("changed", self.show_data)


        # Create a label and entry for name
        name_label = Gtk.Label("Name:")
        vbox.pack_start(name_label, True, True, 0)
        self.name_entry = Gtk.Entry()
        vbox.pack_start(self.name_entry, True, True, 0)

        # Create a label and entry for email
        email_label = Gtk.Label("Email:")
        vbox.pack_start(email_label, True, True, 0)
        self.email_entry = Gtk.Entry()
        vbox.pack_start(self.email_entry, True, True, 0)

        # Create a submit button
        submit_button = Gtk.Button(label="Submit")
        submit_button.connect("clicked", self.get_user_info)
        vbox.pack_start(submit_button, True, True, 0)

        # Create a scrollable text view to display data
        self.data_text = Gtk.TextView()
        self.data_text.set_editable(False)
        self.data_text.set_cursor_visible(False)
        self.data_text.set_wrap_mode(Gtk.WrapMode.WORD)
        scrollable_text = Gtk.ScrolledWindow()
        
        scrollable_text.set_policy(
            Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
        scrollable_text.add(self.data_text)
        scrollable_text.set_size_request(300, 300)
        vbox.pack_start(scrollable_text, True, True, 0)

        # Create a button to delete data
        delete_data_button = Gtk.Button(label="Delete Data")
        delete_data_button.connect("clicked", self.delete_data)
        vbox.pack_start(delete_data_button, True, True, 0)

        show_data_button = Gtk.Button(label="Show Data")
        show_data_button.connect("clicked", self.show_data)
        vbox.pack_start(show_data_button, True, True, 0)


        # Create a button to send email
        send_email_button = Gtk.Button(label="Send Email")
        send_email_button.connect("clicked", self.send_emails)
        vbox.pack_start(send_email_button, True, True, 0)
        self.show_data(None)

    def get_user_info(self, widget):
        name = self.name_entry.get_text()
        email = self.email_entry.get_text()
        table = self.table_combo.get_active_text()
        if self.is_valid_email(email):
            self.save_to_db(name, email, table)
        else:
            message_dialog = Gtk.MessageDialog(
                self, 0, Gtk.MessageType.ERROR, Gtk.ButtonsType.OK, "Invalid email address.")
            message_dialog.run()
            message_dialog.destroy()

    def save_to_db(self, name, email, table):
        conn = sqlite3.connect('user_info.db')
        c = conn.cursor()
        c.execute(
            f"CREATE TABLE IF NOT EXISTS {table} (name TEXT, email TEXT)")
        c.execute(f"INSERT INTO {table} VALUES (?, ?)", (name, email))
        conn.commit()
        message_dialog = Gtk.MessageDialog(
            self, 0, Gtk.MessageType.INFO, Gtk.ButtonsType.OK, "Information saved to database.")
        message_dialog.run()
        message_dialog.destroy()
        conn.close()


    def send_emails(self, widget):
        table = self.table_combo.get_active_text()
       
        conn = sqlite3.connect('user_info.db')
        c = conn.cursor()
        c.execute(f"SELECT email FROM {table}")
        emails = c.fetchall()

        # Construct the URL for the Gmail compose window
        to = ",".join([email[0] for email in emails])
        url = f"https://mail.google.com/mail/?view=cm&fs=1&to={to}&"
        webbrowser.open(url)
        conn.close()

   # Create a button to show data

    def show_data(self, widget):
        conn = sqlite3.connect('user_info.db')
        c = conn.cursor()
        table = self.table_combo.get_active_text()
        c.execute(f"SELECT * FROM {table}")
        data = c.fetchall()
        message = "Name\tEmail\n"
        for row in data:
            message += row[0] + "\t" + row[1] + "\n"
        self.data_text.get_buffer().set_text(message)
        conn.close()

    def delete_data(self, widget):
        conn = sqlite3.connect('user_info.db')
        c = conn.cursor()
        table = self.table_combo.get_active_text()
        c.execute(f"DELETE FROM {table}")
        conn.commit()
        message_dialog = Gtk.MessageDialog(
            self, 0, Gtk.MessageType.INFO, Gtk.ButtonsType.OK, "All data deleted.")
        message_dialog.run()
        message_dialog.destroy()
        conn.close()
        self.show_data(widget)

    def is_valid_email(self, email):
        return re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email)


win = UserInfoWindow()
win = UserInfoWindow()
win.connect("delete-event", Gtk.main_quit)
win.show_all()
Gtk.main()
