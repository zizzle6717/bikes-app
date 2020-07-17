"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const baseUrl = '/v1';
chai_1.should();
describe('Routes', () => {
    let server;
    let request;
    const teardown = () => {
        return;
    };
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield teardown();
        server = app_1.default.listen();
        request = supertest_1.default.agent(server);
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield teardown();
    }));
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe('GET /_healthz', () => {
        it('should have a health check endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/_healthz')
                .expect(200);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNob2VzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEM7QUFDOUMsa0RBQTBCO0FBQzFCLDBEQUFrQztBQUNsQyx3REFBZ0M7QUFFaEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLGFBQU0sRUFBRSxDQUFDO0FBRVQsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDdEIsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLE9BQU8sQ0FBQztJQUVaLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNwQixPQUFPO0lBQ1QsQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLEdBQVMsRUFBRTtRQUNoQixNQUFNLFFBQVEsRUFBRSxDQUFDO1FBRWpCLE1BQU0sR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsT0FBTyxHQUFHLG1CQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsR0FBUyxFQUFFO1FBQ2YsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLGVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQzdCLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxHQUFTLEVBQUU7WUFDbkQsTUFBTSxPQUFPO2lCQUNWLEdBQUcsQ0FBQyxXQUFXLENBQUM7aUJBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzc2VydCwgZXhwZWN0LCBzaG91bGQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgc3VwZXJ0ZXN0IGZyb20gJ3N1cGVydGVzdCc7XG5pbXBvcnQgYXBwIGZyb20gJy4uLy4uL3NyYy9hcHAnO1xuXG5jb25zdCBiYXNlVXJsID0gJy92MSc7XG5zaG91bGQoKTtcblxuZGVzY3JpYmUoJ1JvdXRlcycsICgpID0+IHtcbiAgbGV0IHNlcnZlcjtcbiAgbGV0IHJlcXVlc3Q7XG5cbiAgY29uc3QgdGVhcmRvd24gPSAoKSA9PiB7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGVhcmRvd24oKTtcblxuICAgIHNlcnZlciA9IGFwcC5saXN0ZW4oKTtcbiAgICByZXF1ZXN0ID0gc3VwZXJ0ZXN0LmFnZW50KHNlcnZlcik7XG4gIH0pO1xuXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICBhd2FpdCB0ZWFyZG93bigpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNpbm9uLnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ0dFVCAvX2hlYWx0aHonLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgaGVhbHRoIGNoZWNrIGVuZHBvaW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgcmVxdWVzdFxuICAgICAgICAuZ2V0KCcvX2hlYWx0aHonKVxuICAgICAgICAuZXhwZWN0KDIwMCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=