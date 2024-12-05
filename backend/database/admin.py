from config import ADMIN_PASSWORD, ADMIN_USERNAME, DEV_MODE, HOST
from fastapi import Request
from jinja2 import pass_context
from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from src.cards.models import Card, Group, GroupCard
from src.invitecode.models import InviteCode
from src.tasks.models import Task
from src.users.models import User, UserInviteCode, UserTask, UserCard, UserGroup


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form["username"], form["password"]

        if not (username == ADMIN_USERNAME and password == ADMIN_PASSWORD):
            return False

        request.session.update(
            {"token": "fdbb0dd1-a368-4689-bd71-5888f69b438e"})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        if not token == 'fdbb0dd1-a368-4689-bd71-5888f69b438e':
            return False
        return True


authentication_backend = AdminAuth(secret_key="secret")


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.username]

    can_create = False
    can_edit = True
    form_widget_args_update = dict(
        id=dict(readonly=True), username=dict(readonly=True))
    
    category = 'Пользователи'
    name = 'Пользователь'
    name_plural = 'Пользователи'


class CardAdmin(ModelView, model=Card):
    column_list = [Card.title, Card.bonus, Card.exp, Card.bonus_per_hour,
                   Card.chance, Card.type, Card.section, Card.rating]
    
    column_default_sort = 'chance'

    category = 'Карты'
    name = 'Карта'
    name_plural = 'Карты'

class UserCardAdmin(ModelView, model=UserCard):
    column_list = [UserCard.user, UserCard.card, UserCard.amount]

    category = 'Пользователи'
    name = 'Карта пользователя'
    name_plural = 'Карты пользователей'


class InviteCodeAdmin(ModelView, model=InviteCode):
    column_list = [InviteCode.code, InviteCode.exp,
                   InviteCode.bonus, InviteCode.card]
    
    name = 'Промокод'
    name_plural = 'Промокоды'


class UserInviteCodeAdmin(ModelView, model=UserInviteCode):
    column_list = [UserInviteCode.user, UserInviteCode.invitecode]

    category = 'Пользователи'
    name = 'Использованный код'
    name_plural = 'Использованные коды'


class TaskAdmin(ModelView, model=Task):
    column_list = [Task.id, Task.title, Task.position]
    column_default_sort = "position"

    name = 'Задание'
    name_plural = 'Задания'


class UserTaskAdmin(ModelView, model=UserTask):
    column_list = [UserTask.user, UserTask.task, UserTask.complete]

    category = 'Пользователи'
    name = 'Выполненное задание'
    name_plural = 'Выполненные задания'


class GroupAdmin(ModelView, model=Group):
    column_list = [Group.title, Group.bonus, Group.exp]

    name = 'Сет карт'
    name_plural = 'Сеты карт'

    category = 'Карты'

class GroupCardAdmin(ModelView, model=GroupCard):
    column_list = [GroupCard.group, GroupCard.card]

    name = 'Карта сета'
    name_plural = 'Карты сетов'

    category = 'Карты'

class UserGroupAdmin(ModelView, model=UserGroup):
    column_list = [UserGroup.user, UserGroup.group]

    category = 'Пользователи'
    name = 'Собранные сет'
    name_plural = 'Собранные сеты карт'
    



@pass_context
def my_url_for(context: dict, name: str, /, **path_params) -> str:
    request: Request = context.get("request")
    url = str(request.url_for(name, **path_params))

    if '/admin/statics/' in url and DEV_MODE and 'https' in HOST:
        url = HOST + '/api/admin/statics/' + path_params['path']
        return url

    return url


def init_admin(app, engine):
    admin = Admin(app, engine=engine, base_url='/myadmin',
                  authentication_backend=authentication_backend)
    admin.templates.env.globals['url_for'] = my_url_for

    admin.add_view(UserAdmin)
    admin.add_view(CardAdmin)
    admin.add_view(UserCardAdmin)
    admin.add_view(UserGroupAdmin)

    admin.add_view(GroupAdmin)
    admin.add_view(GroupCardAdmin)

    admin.add_view(InviteCodeAdmin)
    admin.add_view(UserInviteCodeAdmin)
    admin.add_view(TaskAdmin)
    admin.add_view(UserTaskAdmin)

    
