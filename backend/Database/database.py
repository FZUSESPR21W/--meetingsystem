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

    # 管理员登录
    def get_admin(self, email, password):
        with self.db.cursor() as cursor:
            sql = "SELECT * FROM `user` WHERE `email`=%s AND `password`=%s"
            cursor.execute(sql, (email, password,))
            result = cursor.fetchone()

            if result is None:
                return None
            roles = self.__get_roles(result['user_id'])
            cursor.close()
            for i in roles:
                if i['role_type'] < 4:
                    return result
            return None

    def __get_roles(self, user_id):
        with self.db.cursor() as cursor:
            sql = "SELECT `role_type` WHERE `user_id`=%s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchall()
            cursor.close()
            return result

    def __update_user_status(self, user_id):
        with self.db.cursor() as cursor:
            sql = "UPDATE `user` SET `status`=0 WHERE `id`=%s"
            cursor.execute(sql, (user_id,))
            self.db.commit()
            cursor.close()

    # 获取用户所在论坛的角色
    def get_user_role(self, user_id, sub_forum_id):
        with self.db.cursor() as cursor:
            sql = 'SELECT `role_type` FROM `user` WHERE `user_id`=%s AND `sub_forum_id`=%s'
            cursor.execute(sql, (user_id, sub_forum_id,))
            result = cursor.fetchone()
            cursor.close()
            return result

    # 注册
    def add_user(self, language, email, password, username):
        with self.db.cursor() as cursor:
            sql = "INSERT INTO `user` (`language`,`email`,`password`,`username`,`status`) VALUES (%s,%s,%s,%s,1)"
            cursor.execute(sql, (language, email, password, username,))
            cursor.close()
            self.db.commit()

    # 更新语言
    def update_user_language(self, user_id, language):
        with self.db.cursor() as cursor:
            sql = "UPDATE `user` SET `language`=%s WHERE `id`=%s"
            cursor.execute(sql, (language, user_id,))
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
            limit = 10
            offset = (page - 1) * limit
            if forum_id is None:
                sql = "SELECT * FROM `task` LIMIT %s %s"
                cursor.execute(sql, (offset, limit,))
            else:
                sql = "SELECT * FROM `task` WHERE `sub_forum_id`=%s LIMIT %s %s"
                cursor.execute(sql, (forum_id, offset, limit,))
            result = cursor.fetchall()
            return result

    # 获取分论坛信息
    def get_forum(self, forum_id):
        with self.db.cursor() as cursor:
            if forum_id is None:
                sql = "SELECT * FROM `sub_forum`"
                cursor.execute(sql)
            else:
                sql = "SELECT * FROM `sub_forum` WHERE `sub_forum_id`=%s"
                cursor.execute(sql, (forum_id,))
            result = cursor.fetchall()
            return result

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
            sql = "SELECT `r`.`sub_forum_id`,`s`.`issue` FROM `role` AS r JOIN `sub_forum` AS s ON `r`.`sub_forum_id`=`s`.`sub_forum_id` WHERE `r`.`user_id`=%s"
            cursor.execute(sql, user_id)
            sub_forum_id = self.db.commit()
            cursor.close()
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

    # 根据秘书id获取对应分论坛关注者
    def get_participant(self, user_id):
        with self.db.cursor() as cursor:
            sql = "SELECT `u`.`username`,`u`.`email` FROM `user` AS u JOIN `role` AS r ON `u`.`user_id` = `r`.`sub_forum_id` WHERE `r`.`role_type`=3 AND`r`.`user_id`=%s"
            cursor.execute(sql, user_id)
            res = self.db.commit()
            cursor.close()
            return res


if __name__ == "__main__" :
    db = Data()
    print(db.get_participant(5))
    # db.add_user(0, "2475945868@qq.com", "123", "nosae")
    print(db.get_user("2475945868@qq.com", "123"))
