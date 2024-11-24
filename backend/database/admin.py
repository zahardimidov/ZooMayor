from fastapi import Request
from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend

from config import ADMIN_PASSWORD, ADMIN_USERNAME, HOST, DEV_MODE
from src.users.models import User, UserInviteCode, UserTask
from src.cards.models import Card
from src.tasks.models import Task
from src.invitecode.models import InviteCode
from jinja2 import pass_context

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

class CardAdmin(ModelView, model = Card):
    column_list = [Card.title, Card.bonus, Card.exp, Card.bonus_per_hour, Card.chance, Card.type, Card.section, Card.rating]

class InviteCodeAdmin(ModelView, model=InviteCode):
    column_list = [InviteCode.code, InviteCode.exp, InviteCode.bonus, InviteCode.card]

class UserInviteCodeAdmin(ModelView, model=UserInviteCode):
    column_list = [UserInviteCode.user, UserInviteCode.invitecode]


class TaskAdmin(ModelView, model=Task):
    column_list = [Task.id, Task.title, Task.position]
    column_default_sort = "position"
    
class UserTaskAdmin(ModelView, model=UserTask):
    column_list = [UserTask.user, UserTask.task, UserTask.complete]

@pass_context
def my_url_for(context: dict, name: str, /, **path_params) -> str:
    request: Request = context.get("request")
    url = str(request.url_for(name, **path_params))

    if '/admin/statics/' in url and DEV_MODE and 'https' in HOST:
        url = HOST + '/api/admin/statics/' + path_params['path']
        return url

    return url

def init_admin(app, engine):
    admin = Admin(app, engine=engine,
                  authentication_backend=authentication_backend)
    admin.templates.env.globals['url_for'] = my_url_for

    admin.add_view(UserAdmin) 
    admin.add_view(CardAdmin) 
    admin.add_view(InviteCodeAdmin)
    admin.add_view(UserInviteCodeAdmin)
    admin.add_view(TaskAdmin)
    admin.add_view(UserTaskAdmin)
