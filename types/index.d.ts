import {
    PropType
} from 'vue/types/options'
import { Vue } from 'vue/types/vue'

export declare var Fetching: {
    props: {
        fetch: PropType<Function>
    }

    data: () => {
        response: any | null
        error: any | null
        loading: boolean
    }
}