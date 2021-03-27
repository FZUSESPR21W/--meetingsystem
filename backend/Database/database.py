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
            cursor.execute(sql, user_id, sub_forum_id)
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

    # 检查是否关注
    def is_followed(self, user_id, sub_forum_id):
        with self.db.cursor() as cursor:
            sql = "SELECT `role_id` FROM `role` WHERE `sub_forum_id`=%s AND `user_id`=%s"
            cursor.execute(sql, (sub_forum_id, user_id))
            role_id = self.db.commit()
            cursor.close()
            if role_id is None:
                return False
            else:
                return True

    # 用户关注的分论坛列表
    def forum_list(self, user_id):
        with self.db.cursor() as cursor:
            sql = "SELECT `sub_forum_id` FROM `role` WHERE `user_id`=%s"
            cursor.execute(sql, (user_id))
            sub_forum_id = self.db.commit()
            cursor.close()
            print(sub_forum_id)
            return sub_forum_id

    # 所有分论坛
    def all_forum(self):
        with self.db.cursor() as cursor:
            sql = "SELECT `sub_forum_id` FROM `sub_forum` WHERE `sub_forum_id`!=%s"
            cursor.execute(sql, 1)
            sub_forum_id = self.db.commit()
            cursor.close()
            return sub_forum_id

    # 关注
    def like(self, user_id, sub_forum_id):
        with self.db.cursor() as cursor:
            sql = "INSERT INTO `role` (`sub_forum_id`,`role_type`,`user_id`) VALUES (%s,%s,%s)"
            cursor.execute(sql, (sub_forum_id, 4, user_id))
            cursor.close()

    # 取关
    def is_like(self, user_id, sub_forum_id):
        with self.db.cursor() as cursor:
            sql = "DELETE FROM `role` WHERE `user_id`=%s AND `sub_forum_id`=%s"
            cursor.execute(sql, (user_id, sub_forum_id))
            cursor.close()


if __name__ == "__main__":
    db = Data()
    db.forum_list(1)
