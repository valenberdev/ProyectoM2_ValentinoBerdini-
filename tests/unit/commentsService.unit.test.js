jest.mock("../../db/pool", () => ({
  query: jest.fn(),
}));

const pool = require("../../db/pool");
const commentsService = require("../../services/commentsService");

describe("commentsService (unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getCommentsByPost devuelve comentarios ordenados", async () => {
    const rows = [{ id: 1, post_id: 2, content: "Hola" }];
    pool.query.mockResolvedValue({ rows });

    const result = await commentsService.getCommentsByPost(2);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
      [2]
    );
    expect(result).toEqual(rows);
  });

  test("create inserta comentario y devuelve row", async () => {
    const data = { post_id: 1, author_id: 2, content: "Comentario" };
    const created = { id: 20, ...data };
    pool.query.mockResolvedValue({ rows: [created] });

    const result = await commentsService.create(data);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3) RETURNING *",
      [data.post_id, data.author_id, data.content]
    );
    expect(result).toEqual(created);
  });
});
