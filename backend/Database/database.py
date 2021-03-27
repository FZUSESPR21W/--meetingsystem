import pymysql


class Data(object):
    def __init__(self):
        self.db = pymysql.connect(host="47.98.152.179",
        user="tempUser",
        password="tempPass123!",
        database="meeting_system")

    def __del__(self):
        self.db.close()
