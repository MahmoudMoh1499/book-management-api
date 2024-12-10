import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddBooksTable1733863318207 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'author',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'publishedDate',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'numberOfPages',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Dropping the 'books' table in case of rollback
        await queryRunner.dropTable('books');
    }
}
