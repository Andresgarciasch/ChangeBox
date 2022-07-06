"""empty message

Revision ID: 13ce42542301
Revises: 65e5e50a66ac
Create Date: 2022-07-05 16:54:56.843684

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '13ce42542301'
down_revision = '65e5e50a66ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('buypublications_status_key', 'buypublications', type_='unique')
    op.drop_column('buypublications', 'status')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('buypublications', sa.Column('status', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
    op.create_unique_constraint('buypublications_status_key', 'buypublications', ['status'])
    # ### end Alembic commands ###