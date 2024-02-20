import { jest, expect, describe, it } from '@jest/globals';
import { getAllTasks, getTaskById } from './queries';
import { db } from './database';

const testAllTask = [{ id: 1 }, { id: 2 }];

jest.mock('./database', () => {
    return {
        db: {
            any: jest.fn(() => testAllTask),
            one: jest.fn((_sql, ...params) => {
                const taskId = params[0];
                return {
                    id: taskId,
                    title: 'Test task',
                    description: 'Test description',
                    status: 'TODO',
                };
            }),
        }
    }
})


describe('Test queries', () => {
    it('test query', async () => {
        const result = await getAllTasks();

        expect(db.any).toHaveBeenCalled();
        expect(db.any).toHaveBeenLastCalledWith(`SELECT * FROM testTasks;`);

        expect(result).toHaveLength(2);
    })

    it('test getTaskById', async () => {
        const taskId = 'testId'
        const tableName = 'testTasks'
        const result = await getTaskById(taskId);

        expect(db.one).toHaveBeenLastCalledWith(`SELECT * FROM ${tableName} WHERE id = $1`, taskId)
        expect(result).toHaveProperty('id')
        expect(result.id).toBe(taskId)

    })
})
