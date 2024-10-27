"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XToken = void 0;
const common_1 = require("@nestjs/common");
exports.XToken = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-token'];
});
//# sourceMappingURL=x-token.decorator.js.map