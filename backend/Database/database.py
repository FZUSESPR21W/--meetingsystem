import pymysql


class Data(object):
    def __init__(self):
        self.db = pymysql.connect(host="47.98.152.179",
        user="tempUser",
        password="tempPass123!",
        database="meeting_system",
        cursorclass=pymysql.cursors.DictCursor)

    def __del__(self):
        self.db.close()

    # 登录
    def get_user(self, email, password):
        with self.db.cursor() as cursor:
            sql = "SELECT * FROM `user` WHERE `email`=%s AND `password`=%s"
            cursor.execute(sql, (email, password,))
            result = cursor.fetchone()

            if result['status']:
                sql2 = "UPDATE `user` SET `status`=0 WHERE `user_id`=%s"
                cursor.execute(sql2, (result['user_id'],))
                self.db.commit()

            cursor.close()
            return result

    def __update_user_status(self, user_id):
        with self.db.cursor() as cursor:
            sql = "UPDATE `user` SET `status`=0 WHERE `id`=%s"
            cursor.execute(sql, user_id)
            self.db.commit()
            cursor.close()

    # 获取用户所在论坛的角色
    def get_user_role(self, user_id, sub_forum_id):
        with self.db.cursor() as cursor:
            sql = 'SELECT `role_type` FROM `user` WHERE `user_id`=%s AND `sub_forum_id`=%s'
            cursor.execute(sql, (user_id, sub_forum_id))
            result = cursor.fetchone()
            cursor.close()
            return result

    # 注册
    def add_user(self, language, email, password, username):
        with self.db.cursor() as cursor:
            sql = "INSERT INTO `user` (`language`,`email`,`password`,`username`,`status`) VALUES (%s,%s,%s,%s,1)"
            cursor.execute(sql, (language, email, password, username))
            cursor.close()
            self.db.commit()

    # 更新语言
    def update_user_language(self, user_id, language):
        with self.db.cursor() as cursor:
            sql = "UPDATE `user` SET `language`=%s WHERE `id`=%s"
            cursor.execute(sql, (language, user_id))
            self.db.commit()
            cursor.close()

    # 获取论坛议程
    def get_task(self, forum_id):
        with self.db.cursor() as cursor:
            sql = 'SELECT * FROM `task` WHERE id=%s'
            cursor.execute(sql, (forum_id,))
            result = cursor.fetchall()
            cursor.close()
            return result

    # 获取分论坛消息
    def get_message(self, forum_id, page):
        with self.db.cursor() as cursor:
            if forum_id is None:
                sql = "SELECT * FROM `task`"
                cursor.execute(sql)
            else:
                sql = "SELECT * FROM `task` WHERE `sub_forum_id`=%s"
                cursor.execute(sql, forum_id)
            result = cursor.fetchall()
            return result


if __name__ == "__main__" :
    db = Data()
    db.add_user(0, "2475945868@qq.com", "123", "nosae")
    print(db.get_user("2475945868@qq.com", "123"))