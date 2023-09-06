// export { ContentProvider as default } from "destack";
// export { getStaticProps } from "destack/build/server";

import 'regenerator-runtime/runtime'

export { handleEditor } from './api/handle'

export { updateData } from './api/handle'
export { loadData } from './api/handle'
export { uploadFiles } from './api/handle'
export { config } from './api/handle'

// Used on the lib client side
export { getStaticProps } from './props'
