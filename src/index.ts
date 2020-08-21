import Vue, { VNode, CreateElement, RenderContext } from 'vue';
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
        data: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
    },
    data(): { response: undefined | any, error: null | any, loading: boolean } {
        return {
            response: undefined,
            error: undefined,
            loading: false,
        };
    },
    render(createElement: CreateElement, hack: RenderContext): VNode {
        return createElement(this.tag, {}, this.genDisplay());
    },
    methods: {
        async tryFetch() {
            try {
                this.loading = true;
                if (!this.fetch) {
                    throw `Missing required prop: "fetch"`;
                }
                this.response = await this.fetch() || null;
                this.$emit('update:data', this.response);
            } catch (error) {
                this.error = error || null;
            } finally {
                this.loading = false;
            }
        },
        retryFetch() {
            this.error = undefined;
            this.response = undefined;
            this.$emit('update:data', this.response);
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
                })
            }
        },
        genDefault() {
            if (this.response === undefined) {
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
                return
            } else if (this.$scopedSlots.loading) {
                return this.$scopedSlots.loading({
                    loading: this.loading,
                })
            } else if (this.loadingComponent) {
                return this.$createElement(this.loadingComponent, {
                    props: {
                        loading: this.loading,
                    }
                });
            }
        },
        genError() {
            if (this.error === undefined) {
                return;
            } else if (this.$scopedSlots.error) {
                return this.$scopedSlots.error({
                    error: this.error,
                    retry: this.retryFetch,
                });
            } else if (this.errorComponent) {
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
