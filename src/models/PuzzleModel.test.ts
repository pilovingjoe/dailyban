// Jest is not wanting to run on here and I am not sure what the situation is, so I am keeping this file as comment only
// It should run? I am very tired though, so idk

// import { Puzzle } from '../entities/Puzzle.js';
// import { AppDataSource } from '../dataSource.js';
// import { getPuzzleByDate } from './PuzzleModel.js';
//
// jest.mock('../dataSource.js');
//
// const mockedDataSource = jest.mocked(AppDataSource);
//
// describe('getPuzzleByDate', (): void => {
//   beforeEach((): void => {
//     jest.clearAllMocks();
//     mockedDataSource.getRepository.mockReturnValue({
//       findOneBy: mockFindOneBy,
//     } as never);
//   }
//   it('returns the puzzle when one is found', async (): Promise<void> => {
//     const fakePuzzle = { date: '2000-01-01', content: '#' };
//     mockFindOneBy.mockResolvedValue(fakePuzzle);
//
//     const result = await getPuzzleByDate('2000-01-01');
//
//     expect(result).toEqual(fakePuzzle);
//     expect(MockFindOneBy).toHaveBeenCalledWith({ id: '2000-01-01' });
//   });
// });
//
