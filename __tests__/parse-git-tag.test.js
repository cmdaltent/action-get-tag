"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const parse_git_tag_1 = __importStar(require("../src/parse-git-tag"));
(0, globals_1.describe)('parse-git-tag', () => {
    (0, globals_1.it)('should parse a tag', () => {
        (0, globals_1.expect)((0, parse_git_tag_1.default)('refs/tags/v1.2.3')).toBe('v1.2.3');
        (0, globals_1.expect)((0, parse_git_tag_1.default)('refs/tags/9.7.8')).toBe('9.7.8');
    });
    (0, globals_1.it)('should throw an error if the input is not a tag', () => {
        (0, globals_1.expect)(() => (0, parse_git_tag_1.default)('randomSomethingNotATag')).toThrow(new parse_git_tag_1.InvalidInputRefError());
    });
    (0, globals_1.it)('should throw an error if the input is empty', () => {
        (0, globals_1.expect)(() => (0, parse_git_tag_1.default)(undefined)).toThrow(new parse_git_tag_1.EmptyInputRefError());
    });
});
