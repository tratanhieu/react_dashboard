export const _getAllCheckedItem = () => {
    let data = [];
    const checkboxItems = document.querySelectorAll(
        `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
    );

    if (checkboxItems) {
        checkboxItems.forEach(item => data.push(item.value));
    }
    return data;
}

export const _handleCheckAll = (_, checkbox) => {
    const checkboxItems = document.querySelectorAll(
        `div[data-checkbox='checkboxItem'] input[type='checkbox']:${
        checkbox.checked ? `not(:checked)` : `checked`}`
    );
    // checkboxItems.forEach(item => item.checked = checkbox.checked ? "checked" : "");
    checkboxItems.forEach(item => item.click());
}

export const _handleCheckItem = (_, checkbox) => {
    const checkboxAll = document.querySelector(`div[table-header-checkbox=tableCheckAllItem] input[type='checkbox']:checked`)
    const isCheckAll = _checkCheckAll(checkbox.checked)
    if (checkboxAll && !isCheckAll) {
        checkboxAll.checked = ""
        return false
    }
    if (!checkboxAll && isCheckAll) {
        document.querySelector(`div[table-header-checkbox=tableCheckAllItem] input[type='checkbox']`).checked = "checked"
    }
}

const _checkCheckAll = isChecked => {
    const checkboxItems = document.querySelectorAll(
        `div[data-checkbox='checkboxItem'] input[type='checkbox']`
    ).length;

    console.log("Total:" + checkboxItems)

    const checkboxItemsChecked = document.querySelectorAll(
        `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
    ).length + (isChecked ? 1 : (-1));

    console.log("Current:" + checkboxItemsChecked)


    return checkboxItems === checkboxItemsChecked;
}