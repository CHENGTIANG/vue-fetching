import Vue from 'vue';
export default Vue.extend({
    props: {
        fetch: {
            type: Function,
            required: true,
        },
        tag: {
            type: String,
            default: 'div',
        },
        loadingComponent: Function || String,
        errorComponent: Function || String,
    },
    data() {
        return {
            response: null,
            error: null,
            loading: false,
        };
    },
    render(createElement, hack) {
        return createElement(this.tag, {}, this.genDisplay());
    },
    methods: {
        async tryFetch() {
            try {
                this.loading = true;
                if (!this.fetch) {
                    throw `Missing required prop: "fetch"`;
                }
                this.response = await this.fetch();
            }
            catch (error) {
                this.error = error;
            }
            finally {
                this.loading = false;
            }
        },
        async retryFetch() {
            this.error = null;
            this.tryFetch();
        },
        genDisplay() {
            const combinedScopedSlot = this.genCombinedSlot();
            if (combinedScopedSlot) {
                return [combinedScopedSlot];
            }
            return [
                this.genLoading(),
                this.genError(),
                this.genDefault()
            ];
        },
        genCombinedSlot() {
            if (this.$scopedSlots.combined) {
                return this.$scopedSlots.combined({
                    loading: this.loading,
                    error: this.error,
                    retry: this.retryFetch,
                    data: this.response,
                });
            }
        },
        genDefault() {
            if (!this.response) {
                return;
            }
            if (this.$scopedSlots.default) {
                return this.$scopedSlots.default({
                    data: this.response,
                });
            }
        },
        genLoading() {
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
        genError() {
            if (!this.error) {
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
    created() {
        this.tryFetch();
    },
});
//# sourceMappingURL=index.js.map