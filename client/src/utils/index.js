import dateFnsFormat from 'date-fns/format';

export const defaultPagination = { limit: 10, offset: 0, total: 0 };

export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function createFormData(name, value) {
  const formData = new FormData();
  formData.append(name, value);
  return formData;
}

export const STATUS_REQUEST = 'request';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILED = 'failed';

export function isLoading(status) {
  return status === STATUS_REQUEST;
}

export function formatDate(date, format = 'MM-DD-YYYY hh:mm a') {
  return dateFnsFormat(date, format);
}

export function getId({ id }) {
  return id;
}

export function getEmptyRowsCount(rowsPerPage, contentLength, page) {
  return (
    rowsPerPage - Math.min(rowsPerPage, contentLength - page * rowsPerPage)
  );
}

export const markType = type => item => ({ ...item, type });

export const getUnique = (array = []) => [...new Set(array)];

export const getOrderAndOrderBy = (orderFromProps = '') => {
  const re = /^-/;
  const order = re.test(orderFromProps) ? 'desc' : 'asc';
  const orderBy = orderFromProps.replace(re, '');
  return {
    order,
    orderBy,
  };
};

export const setOrderForServer = (orderFromProps, orderProperty) => {
  const { order } = getOrderAndOrderBy(orderFromProps);
  return order === 'desc' ? `+${orderProperty}` : `-${orderProperty}`;
};
