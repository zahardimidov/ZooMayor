from typing import Any, Dict
from config import ENGINE
from sqlalchemy.ext.asyncio import (AsyncAttrs, async_sessionmaker,
                                    create_async_engine)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text


engine = create_async_engine(url=ENGINE, echo=False)

async_session = async_sessionmaker(engine)


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True
    
    def to_dict(self) -> Dict[str, Any]:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


async def run_database():
    async with engine.begin() as conn:            
        await conn.run_sync(Base.metadata.create_all)


async def drop_all():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

        tables = list(Base.metadata.tables.keys())    
        print(tables)
        for table in tables:
            await conn.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE;"))
        
        
    print('Database was dropped')
