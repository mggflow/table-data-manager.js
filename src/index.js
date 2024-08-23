import TableDataManager from "./TableDataManager.js";
import Grouper from "./Grouper.js";
import Viewer from "./Viewer.js";
import Sorter from "./Sorter.js";

/**
 * Make TableDataManager with initialized parts.
 * @param groupingDefDelimiter
 * @param groupingDefEmptyPlug
 * @param viewingDefDelimiter
 * @param viewingDefEmptyPlug
 * @returns {TableDataManager}
 */
export default function makeTableDataManager(groupingDefDelimiter = '~/~', groupingDefEmptyPlug = '.?~`',
                                             viewingDefDelimiter = '; ', viewingDefEmptyPlug = '-') {
    return new TableDataManager(new Grouper(groupingDefDelimiter, groupingDefEmptyPlug),
        new Viewer(viewingDefDelimiter, viewingDefEmptyPlug), new Sorter())
}
