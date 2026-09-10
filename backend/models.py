from datetime import datetime

from sqlalchemy import DateTime, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Calculation(Base):
    __tablename__ = "calculations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    transport: Mapped[float] = mapped_column(Float)
    electricity: Mapped[float] = mapped_column(Float)
    flights: Mapped[float] = mapped_column(Float)
    diet: Mapped[float] = mapped_column(Float)
    shopping: Mapped[float] = mapped_column(Float)
    total: Mapped[float] = mapped_column(Float)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )