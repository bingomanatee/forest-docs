import style from './CompTable.module.css';

const Decorator = ({children, dec}) => {
 return <div className={style[dec]}>
   {children}
  </div>
}

function chunk(array: any[], chunks = 1) {
  return array.reduce((list: any[][], item) => {
    if (!list.length) {
      return [[item]];
    }
    if (list[list.length - 1].length >= chunks) {
      list.push([item])
    } else {
      list[list.length - 1].push(item);
    }
    return list;
  }, []);
}

const CompTableRow = ({ item, cols }) => (
  <tr>
    {cols.map(col => {
      const value = col.key in item ? item[col.key] : <span>&nbsp;</span>;
      const cell = col.decorator ? <Decorator dec={col.decorator}>{value}</Decorator> : value;
      return <td rowSpan={col.rowSpan || 1} colSpan={col.colSpan || 1}>{cell}</td>
    })}
  </tr>
)

function getRow(col) {
  return 'row' in col ? Number.parseInt(col.row, 10) : 0;
}

const CompTableHead = ({ cols, rows }) => {
  return (
    <thead>
    {rows.map((row) => {
      const rowCols = cols.filter(col => getRow(col) === row);
      return (
        <tr>
          {
            rowCols.map((col) => {
              const cell = col.decorator ? <Decorator dec={col.decorator}>{col.title}</Decorator> : col.title;

              return (
                <th id={`${col.key}-head`} rowSpan={col.rowSpan || 1} colSpan={col.colSpan || 1}>
                  {cell}
                </th>
              )
            })
          }
        </tr>
      )
    })}
    </thead>
  )
}

const CompTable = ({ data, cols, chunks = 3 }) => {
  const rows = Array.from(cols.reduce(
    (r, col) => {
      r.add(getRow(col));
      return r;
    },
    new Set()).values()).sort((a: any, b: any) => a - b);

  const columns: number = rows.reduce<number>((cc: number, row) => {
    const rowCols = cols.filter(col => getRow(col) === row);
    const rowCC = rowCols.reduce((rcc, col) => {
      const span = ('colSpan' in col) ? col.colSpan : 1;
      return rcc + span;
    }, 0);
    return Math.max(cc, rowCC);
  }, 0);

  const dataChunks = chunk(data, chunks);

  return (
    <table className={style.compTable}>
      { dataChunks.map(data => {
        return (
          <>
            <CompTableHead cols={cols} rows={rows}/>

            <tbody>
            {
              data.map((item) => {
                const rowList = rows.map((row) => {
                  const rowCols = cols.filter(col => getRow(col) === row);
                  return <CompTableRow item={item} cols={rowCols}/>;
                });
                return <>
                  {rowList}
                  <tr>
                    <td colSpan={columns}>
                      <hr/>
                    </td>
                  </tr>

                </>
              })
            }
            </tbody>
          </>
        )
      })
      }


    </table>
  )
}

export default CompTable;
