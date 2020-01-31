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
        }
    },
    data() {
        return {
            response: null,
            error: null,
            loading: false,
        };
    },
    render(createElement, hack) {
        const defaultScopedSlot = this.response && this.$scopedSlots.default;
        const loadingScopedSlot = this.loading && this.$scopedSlots.loading;
        const errorScopedSlot = this.error && this.$scopedSlots.error;
        const combinedScopedSlot = this.$scopedSlots.combined;
        return createElement(this.tag, {}, combinedScopedSlot ? [
            combinedScopedSlot({
                loading: this.loading,
                error: this.error,
                retry: this.retryFetch,
                data: this.response,
            })
        ] : [
            loadingScopedSlot && loadingScopedSlot({
                loading: this.loading,
            }),
            errorScopedSlot && errorScopedSlot({
                error: this.error,
                retry: this.retryFetch,
            }),
            defaultScopedSlot && defaultScopedSlot({
                data: this.response,
            }),
        ]);
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
    },
    created() {
        this.tryFetch();
    },
});
//# sourceMappingURL=index.js.map