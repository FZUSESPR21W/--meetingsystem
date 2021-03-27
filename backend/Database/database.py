import pymysql


class Data(object):
    def __init__(self):
        self.db = pymysql.connect(host="47.98.152.179",
        user="tempUser",
        password="tempPass123!",
        database="meeting_system")

    def __del__(self):
        self.db.close()


    #获取所管理的论坛
    def get_forum_charge(self,admin_id):
        with self.db.cursor() as cursor:
            sql = "SELECT sub_forum_id FROM role WHERE user_id=%s"
            cursor.execute(sql, (admin_id))
            forum_id = self.db.commit()
            sql = "SELECT issue FROM sub_forum WHERE sub_forum_id=%s"
            cursor.execute(sql,(forum_id))
            issue = self.db.commit()
            cursor.close()
            result = [{
                "id":forum_id,
                "forum":issue
            }]
            return result

    #发布消息
    def publish_message(self,id,content,admin_id):
        with self.db.cursor() as cursor:
            sql = "INSERT INTO `message` (`sub_forum_id`,`content`) VALUES (%s,%s)"
            cursor.execute(sql, (id,content))
            self.db.commit()
            cursor.close()
            return True


if __name__ == "__main__" :
    db = Data()
    db.get_forum_charge(1)