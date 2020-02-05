export const ALL = ''
export const ACTIVE = 'ACTIVE'
export const HIDDEN = 'HIDDEN'
export const DELETED = 'DELETED'
export const UNAVAILABLE = 'UNAVAILABLE'
export const AVAILABLE = 'AVAILABLE'
export const STOP = 'STOP'

export const DEFAULT_STATUS = {
    ACTIVE: {
        color: 'green',
        text: 'Hiển thị'
    },
    HIDDEN: {
        color: 'grey',
        text: 'Đã ẩn'
    },
    DELETED: {
        color: 'red',
        text: 'Đã xóa'
    }
}

export const SALE_STATUS = {
    UNAVAILABLE: {
        color: 'blue',
        text: 'Sắp tới'
    },
    AVAILABLE: {
        color: 'green',
        text: 'Đang diễn ra'
    },
    STOP: {
        color: 'black',
        text: 'Đã ngừng'
    }
}