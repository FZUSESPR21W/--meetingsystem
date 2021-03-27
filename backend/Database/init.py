import datetime
import random
import time

from Database.database import Data


def insertUser(username, password, email, language, status):
    data = Data()
    cursor = data.db.cursor()
    sql = "insert into user (username, password, email, language, status) \
            values ('%s', '%s',  '%s',  %d,  %d)" % \
          (username, password, email, language, status)
    cursor.execute(sql)
    data.db.commit()


def insertSub_Forum(chairman_id, issue):
    data = Data()
    cursor = data.db.cursor()
    sql = "insert into sub_forum (chairman_id, issue, start_time) \
            values (%d, '%s', '%s')" % \
          (chairman_id, issue, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    cursor.execute(sql)
    data.db.commit()


def setRole(user_id, role_type, sub_forum_id):
    data = Data()
    cursor = data.db.cursor()
    sql = "insert into role (user_id, role_type, sub_forum_id) \
            values (%d, %d, %d)" % \
          (user_id, role_type, sub_forum_id)
    cursor.execute(sql)
    data.db.commit()


def initUser():
    # 设置会议主席
    insertUser("admin", "123456", "000@qq.com", 0, 1)

    # 设置分会议主席
    for i in range(4):
        insertUser("admin_sub" + str(i), "123456", str(i + 100) + "@qq.com", random.randint(0, 4), random.randint(0, 1))

    # 设置秘书
    for i in range(5):
        insertUser("secretary" + str(i), "123456", str(i + 200) + "@qq.com", random.randint(0, 4), random.randint(0, 1))

    # 设置普通用户
    for i in range(30):
        insertUser("normal_user" + str(i), "123456", str(i + 400) + "@qq.com", random.randint(0, 4),
                   random.randint(0, 1))


def initSub_Forum():
    # 创建主会议
    insertSub_Forum(1, "第二十届划水大会")
    # 创建分会议
    for i in range(4):
        insertSub_Forum(i + 2, "第二十届划水分论坛" + str(3 - i))


def initRole():
    # 设置主会议主席和秘书
    setRole(1, 1, 1)    # 主席
    setRole(6, 3, 1)    # 秘书

    # 设置分论坛主席和秘书
    for i in range(4):
        setRole(i + 2, 2, i + 2)    # 设置分论坛主席
        setRole(i + 7, 3, 5 - i)    # 设置分论坛秘书

    # 设置用户关注
    for i in range(30):
        len = random.randint(1, 4)
        for j in range(len):
            setRole(i + 11, 4, j + 2)


def insertMessage(sub_forum_id, content):
    data = Data()
    cursor = data.db.cursor()
    sql = "insert into message (sub_forum_id, content, time) \
            values (%d, '%s', '%s')" % \
          (sub_forum_id, content, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    cursor.execute(sql)
    data.db.commit()

def initMessage():
    # 添加信息
    for i in range(5):
        len = random.randint(10, 20)
        for j in range(len):
            insertMessage(i + 1, "主席发布了很多信息，信息，信息，信息，信息" + str(j + 1))


def insertTask(sub_forum_id):
    data = Data()
    cursor = data.db.cursor()
    sql = "insert into task (sub_forum_id, time) \
            values (%d, '%s')" % \
          (sub_forum_id, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    cursor.execute(sql)
    data.db.commit()


def initTask():
    for i in range(5):
        len = random.randint(3, 8)
        for j in range(len):
            insertTask(i + 1)


