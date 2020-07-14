import { __awaiter, __generator } from "tslib";
import Vue from 'vue';
export default Vue.extend({
    name: "Fetching",
    props: {
        fetch: {
            type: Function,
            required: true,
        },
        tag: {
            type: String,
            default: 'div',
        },
        loadingComponent: [Function, String],
        errorComponent: [Function, String],
    },
    data: function () {
        return {
            response: undefined,
            error: undefined,
            loading: false,
        };
    },
    render: function (createElement, hack) {
        return createElement(this.tag, {}, this.genDisplay());
    },
    methods: {
        tryFetch: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            this.loading = true;
                            if (!this.fetch) {
                                throw "Missing required prop: \"fetch\"";
                            }
                            _a = this;
                            return [4 /*yield*/, this.fetch()];
                        case 1:
                            _a.response = (_b.sent()) || null;
                            return [3 /*break*/, 4];
                        case 2:
                            error_1 = _b.sent();
                            this.error = error_1 || null;
                            return [3 /*break*/, 4];
                        case 3:
                            this.loading = false;
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        retryFetch: function () {
            this.error = undefined;
            this.response = undefined;
            this.tryFetch();
        },
        genDisplay: function () {
            var combinedScopedSlot = this.genCombinedSlot();
            if (combinedScopedSlot) {
                return [combinedScopedSlot];
            }
            return [
                this.genLoading(),
                this.genError(),
                this.genDefault()
            ];
        },
        genCombinedSlot: function () {
            if (this.$scopedSlots.combined) {
                return this.$scopedSlots.combined({
                    loading: this.loading,
                    error: this.error,
                    retry: this.retryFetch,
                    data: this.response,
                });
            }
        },
        genDefault: function () {
            if (this.response === undefined) {
                return;
            }
            if (this.$scopedSlots.default) {
                return this.$scopedSlots.default({
                    data: this.response,
                });
            }
        },
        genLoading: function () {
            if (!this.loading) {
                return;
            }
            else if (this.$scopedSlots.loading) {
                return this.$scopedSlots.loading({
                    loading: this.loading,
                });
            }
            else if (this.loadingComponent) {
                return this.$createElement(this.loadingComponent, {
                    props: {
                        loading: this.loading,
                    }
                });
            }
        },
        genError: function () {
            if (this.error === undefined) {
                return;
            }
            else if (this.$scopedSlots.error) {
                return this.$scopedSlots.error({
                    error: this.error,
                    retry: this.retryFetch,
                });
            }
            else if (this.errorComponent) {
                return this.$createElement(this.errorComponent, {
                    props: {
                        error: this.error,
                        retry: this.retryFetch,
                    }
                });
            }
        },
    },
    created: function () {
        this.tryFetch();
    },
});
//# sourceMappingURL=index.js.map