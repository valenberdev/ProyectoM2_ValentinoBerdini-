const errorHandler = require("../../middlewares/errorHandler");

describe("errorHandler (unit)", () => {
  const req = {};
  const next = jest.fn();
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("mapea 23505 a 409", () => {
    const err = { code: "23505", stack: "stack" };

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "El email ya está registrado" });
  });

  test("mapea 23503 a 400", () => {
    const err = { code: "23503", stack: "stack" };

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "El recurso referenciado no existe" });
  });

  test("error genérico devuelve 500", () => {
    const err = { code: "UNKNOWN", stack: "stack" };

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Ocurrió un error en el servidor" });
  });
});
