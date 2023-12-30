/* eslint-disable @typescript-eslint/no-explicit-any */
import { For, JSX, ParentProps } from "solid-js";

interface TCellProps {
  classes: string;
}
export const TCell = (props: ParentProps<TCellProps>) => {
  return (
    <td class="table-cell">
      <div
        class={` flex items-center bg-gray-700 max-h-[6.5rem] ${
          props.classes ?? ""
        }`}
      >
        {props.children}
      </div>
    </td>
  );
};

export const THead = (props: ParentProps<TCellProps>) => {
  return (
    <th class="table-cell">
      <div
        class={`flex items-center font-regular text-xs text-gray-200 max-h-[4.8rem] ${
          props.classes ?? ""
        }`}
      >
        {props.children}
      </div>
    </th>
  );
};

export interface TableColumnsProps<T extends T[]> {
  name: string;
  field?: keyof T[number];
  hidden?: boolean;
  customCell?: (data: T[number]) => JSX.Element;
  customHead?: (data: TableColumnsProps<T>) => JSX.Element;
  cellStyle?: string;
  headStyle?: string;
}

export interface TableProps<T extends T[]> {
  data: T;
  extractKey: (data: T[number]) => string;
  columns: TableColumnsProps<T>[];
  tableStyle?: string;
  total?: number;
}

function Table<T extends any[]>(props: TableProps<T>) {
  return (
    <table class="w-full table bg-gray-700">
      <thead>
        <tr class="table-row bg-gray-800 h-[4.8rem] border-b-[1px] border-solid border-b-gray-600">
          <For
            each={props.columns}
            children={(v) => {
              if (v.hidden) {
                return <></>;
              }
              if (v.customHead) {
                return v.customHead(v);
              }
              return (
                <THead
                  classes={v.headStyle ?? ""}
                  // key={(v.field ?? v.name) as string}
                >
                  {v.name}
                </THead>
              );
            }}
          />
        </tr>
      </thead>
      <tbody>
        <For
          each={props.data}
          fallback={<h1>No Items</h1>}
          children={(v) => {
            return (
              <tr
                class="w-full table-row bg-gray-700 h-[6.5rem] border-b-[1px] border-solid border-b-gray-600"
                // key={props.extractKey(v)}
              >
                <For
                  each={props.columns}
                  fallback={<></>}
                  children={(c) => {
                    if (c.hidden) {
                      return <></>;
                    }
                    if (c.customCell) {
                      return c.customCell(v);
                    }
                    return (
                      <TCell
                        // key={(c.field ?? c.name) as any}
                        classes={c.cellStyle ?? ""}
                      >
                        {v[c.field]}
                      </TCell>
                    );
                  }}
                />
              </tr>
            );
          }}
        />
      </tbody>
      <tfoot class="w-full bg-primary-700">
        <tr class="table-row">
          <td class="table-cell" colSpan={100}>
            <div class="flex justify-between items-center ">
              <div class="ml-xs1 text-gray-50 py-md0">
                Showing 50 entires of {props.total ?? 0}
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
