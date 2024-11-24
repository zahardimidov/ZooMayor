

import argparse
import os


def main():
    # Create the parser
    parser = argparse.ArgumentParser(description='Manage your application.')

    # Add an argument for the command
    parser.add_argument('command', type=str, help='The command to execute')
    
    # Add an optional argument for additional parameters
    parser.add_argument('name', nargs=argparse.REMAINDER, help='Additional parameters for the command')

    # Parse the arguments
    args = parser.parse_args()

    appname: str = args.name[0]

    if args.command == 'createapp' and appname:
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

if __name__ == '__main__':
    main()