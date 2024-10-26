import TableDataManager from "./TableDataManager.js";
import Grouper from "./Grouper.js";
import Viewer from "./Viewer.js";
import Sorter from "./Sorter.js";

/**
 * Make TableDataManager with initialized parts.
 * @param grouperSettings
 * @param viewerSettings
 * @param grouperSingleValueConverter
 * @param viewerSingleValueConverter
 * @returns {TableDataManager}
 */
export default function makeTableDataManager(
    grouperSettings = null, viewerSettings = null,
    grouperSingleValueConverter = null, viewerSingleValueConverter = null
) {
    return new TableDataManager(
        new Grouper(grouperSettings, grouperSingleValueConverter),
        new Viewer(viewerSettings, viewerSingleValueConverter),
        new Sorter()
    )
}
