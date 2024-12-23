from typing import Any, Dict

from config import ENGINE
from sqlalchemy import text
from sqlalchemy.ext.asyncio import (AsyncAttrs, async_sessionmaker,
                                    create_async_engine)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool

engine = create_async_engine(
    url='postgresql+asyncpg://'+ENGINE, echo=False, poolclass=NullPool)

async_session = async_sessionmaker(engine)


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True

    def to_dict(self) -> Dict[str, Any]:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


async def run_database(reset=False):
    async with engine.begin() as conn:
        if reset:
            tables = list(Base.metadata.tables.keys())
            print(tables)
            for table in tables:
                await conn.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE;"))
        await conn.run_sync(Base.metadata.create_all)


async def drop_all():
    async with async_session() as session:
        await session.run_sync(Base.metadata.drop_all)

    print('Database was dropped')


async def text_query(query: str):
    async with async_session() as session:
        await session.execute(text(query))
        await session.commit()