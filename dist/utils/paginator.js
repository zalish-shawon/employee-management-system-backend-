"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPagination = buildPagination;
function buildPagination(query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Number(query.limit) || 10, 100);
    const skip = (page - 1) * limit;
    const sort = query.sort || '-createdAt';
    return { page, limit, skip, sort };
}
