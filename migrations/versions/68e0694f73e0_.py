"""empty message

Revision ID: 68e0694f73e0
Revises: 13ce42542301
Create Date: 2022-07-05 17:33:11.544798

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '68e0694f73e0'
down_revision = '13ce42542301'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('buypublications', sa.Column('user_id_pub', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'buypublications', 'user', ['user_id_pub'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'buypublications', type_='foreignkey')
    op.drop_column('buypublications', 'user_id_pub')
    # ### end Alembic commands ###