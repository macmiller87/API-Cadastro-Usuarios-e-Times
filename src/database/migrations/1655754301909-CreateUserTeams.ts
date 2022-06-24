import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUserTeams1655754301909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teams",
                columns: [
                    {
                        name: "team_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "teamName",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "city",
                        type: "varchar"
                    },
                    {
                        name: "country",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],

                foreignKeys: [
                    {
                      name: "teams",
                      columnNames: ["user_id"],
                      referencedTableName: "users",
                      referencedColumnNames: ["user_id"],
                      onUpdate: 'CASCADE',
                      onDelete: 'CASCADE'
                    },
                ]
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teams");
    };
};
