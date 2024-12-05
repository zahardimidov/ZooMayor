

import argparse
import os

os.environ['ENGINE'] = 'postgresql+asyncpg://zoomayor:zoomayor@0.0.0.0:5433/zoomayor'

import asyncio
from run import drop_all
import subprocess
from time import sleep

def main():
    # Create the parser
    parser = argparse.ArgumentParser(description='Manage your application.')

    parser.add_argument('command', type=str, help='The command to execute')
    parser.add_argument('name', help='Additional parameters for the command', nargs='?')

    # Parse the arguments
    args = parser.parse_args()


    if args.command == 'createapp':
        appname: str = args.name

        if not appname:
            raise Exception('You should provide appname')
        
        if not 'src' in os.listdir():
            os.mkdir('src')

        if not appname in os.listdir('src'):
            os.mkdir(f'src/{appname}')

            with open(f'src/{appname}/api.py', 'w') as f:
                f.write(
                    f'from fastapi import APIRouter\n\nrouter = APIRouter(prefix="/{appname}")'
                )

            with open(f'src/{appname}/schemas.py', 'w') as f:
                f.write(
                    f'from pydantic import BaseModel\n\n'
                )

            with open(f'src/{appname}/models.py', 'w') as f:
                f.write(
                    f'from database.session import Base'
                )
        else:
            raise Exception('App was already created')
        
    elif args.command == 'drop':
        try:
            subprocess.run(["docker-compose", "up", "zoomayor-postgres", "-d"])
        except:
            subprocess.run(["docker", "compose", "up", "zoomayor-postgres", "-d"])
        sleep(3)
        asyncio.new_event_loop().run_until_complete(drop_all())
        try:
            subprocess.run(["docker-compose", "down"])
        except:
            subprocess.run(["docker", "compose", "up", "zoomayor-postgres", "-d"])




if __name__ == '__main__':
    main()
