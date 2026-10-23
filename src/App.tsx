import { useState } from 'react';
import './App.css'

type Todo = {
  id: number,
  title: string,
  date: string,
  status: string,
  detail: string,
};

export const App = () => {
  const [todoId, setTodoId] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const [todoStatus, setTodoStatus] = useState('未着手');
  const [todoDetail, setTodoDetail] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
  {
    id: 1,
    title: 'Reactの勉強',
    date: '2026-10-25',
    status: '進行中',
    detail: '動画見る',
  },
  {  
    id: 2,
    title: 'TODOリスト作る',
    date: '2026-10-25',
    status: '未着手',
    detail: 'cursorでやる',
  }
]);

// 「いまTODO一覧の何番目を編集しているか」を覚えておく
// 初期値がnullなのは「まだ編集対象が決まっていない」という意味
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTodoId, setEditTodoId] = useState('');
  const [editTodoTitle, setEditTodoTitle] = useState('');
  const [editTodoDate, setEditTodoDate] = useState('');
  const [editTodoStatus, setEditTodoStatus] = useState('未着手');
  const [editTodoDetail, setEditTodoDetail] = useState('');
  const [filterId, setFilterId] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('すべて');

  
// 追加フォーム用のonChange関数5個
const onChangeTodoId = (
  event: React.ChangeEvent<HTMLInputElement>
) => setTodoId(event.target.value);

const onChangeTodoTitle = (
  event: React.ChangeEvent<HTMLInputElement>
) => setTodoTitle(event.target.value);

const onChangeTodoDate = (
  event: React.ChangeEvent<HTMLInputElement>
) => setTodoDate(event.target.value);

const onChangeTodoStatus = (
  event: React.ChangeEvent<HTMLSelectElement>
) => setTodoStatus(event.target.value);

const onChangeTodoDetail = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => setTodoDetail(event.target.value);

// 編集フォーム用のonChange関数5個
const onChangeEditTodoId = (
  event: React.ChangeEvent<HTMLInputElement>
) => setEditTodoId(event.target.value);

const onChangeEditTodoTitle = (
  event: React.ChangeEvent<HTMLInputElement>
) => setEditTodoTitle(event.target.value);

const onChangeEditTodoDate = (
  event: React.ChangeEvent<HTMLInputElement>
) => setEditTodoDate(event.target.value);

const onChangeEditTodoStatus = (
  event: React.ChangeEvent<HTMLSelectElement>
) => setEditTodoStatus(event.target.value);

const onChangeEditTodoDetail = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => setEditTodoDetail(event.target.value);

// 絞り込み機能
const onchangefilterId = (
  event: React.ChangeEvent<HTMLInputElement>
) => setFilterId(event.target.value);

const onchangefilterDate = (
  event: React.ChangeEvent<HTMLInputElement>
) => setFilterDate(event.target.value);

const onchangefilterStatus = (
  event: React.ChangeEvent<HTMLSelectElement>
) => setFilterStatus(event.target.value);

// 追加ボタンの処理
const onClickAdd = () => {
  if (todoId === '' || todoTitle === '') return;
  const newTodo: Todo = {
    id: Number(todoId),
    title: todoTitle,
    date: todoDate,
    status: todoStatus,
    detail: todoDetail,
  };
  setTodos([...todos, newTodo]);
  setTodoId('');
  setTodoTitle('');
  setTodoDate('');
  setTodoStatus('未着手');
  setTodoDetail('');
};

// 編集ボタンの処理
// 編集ボタンを押した時点でどのTODOを編集しているか特定しないといけない
const onClickEdit = (index: number) => {
  const todo = todos[index];
  setEditTodoId(String(todo.id));
  setEditTodoTitle(todo.title);
  setEditTodoDate(todo.date);
  setEditTodoStatus(todo.status);
  setEditTodoDetail(todo.detail);
  setEditingIndex(index);
}

// 削除ボタンの処理
const onClickDelete = (index: number) => {
  const newTodos = [...todos];
  newTodos.splice(index, 1);
  setTodos(newTodos);
}

// 保存ボタンの処理
const onClickSave = () => {
  if (editingIndex === null) return;
  const newTodos = [...todos];
  newTodos[editingIndex] = {
    id: Number(editTodoId),
    title: editTodoTitle,
    date: editTodoDate,
    status: editTodoStatus,
    detail: editTodoDetail,
  };
  setTodos(newTodos);
}

// キャンセルボタンの処理
const onClickCancel = () => {
  setEditTodoId('');
  setEditTodoTitle('');
  setEditTodoDate('');
  setEditTodoStatus('未着手');
  setEditTodoDetail('');
}

// 絞り込み機能
const filteredTodos = todos.filter((todo) => {
  const matchesId = filterId === '' || todo.id === Number(filterId);
  const matchesDate = filterDate === '' || todo.date === filterDate;
  const matchesStatus = filterStatus === 'すべて' || todo.status === filterStatus;

  return matchesId && matchesDate && matchesStatus;
});
  return (
    <>
    <h1>TODOリスト</h1>

    <div className="add-form">
      <h2>TODOを追加</h2>
      <input type="number"
             placeholder="IDを入力"
             value={todoId}
             onChange={onChangeTodoId} />
      <input type="text"
             placeholder="タイトルを入力"
             value={todoTitle}
             onChange={onChangeTodoTitle} />
      <input type="date"
             placeholder="期限を選択"
             value={todoDate}
             onChange={onChangeTodoDate} />
      <select value={todoStatus}
              onChange={onChangeTodoStatus}>
        <option>未着手</option>
        <option>進行中</option>
        <option>完了</option>
      </select>
      <textarea placeholder="詳細を入力(任意)"
                value={todoDetail}
                onChange={onChangeTodoDetail}>
      </textarea>
      <button onClick={onClickAdd}>追加</button>
    </div>

    <div className="filter-form">
      <h2>表示設定</h2>
      <input type="number"
             placeholder="IDを入力"
             value={filterId}
             onChange={onchangefilterId} />
      <input type="date"
             placeholder="期限を選択"
             value={filterDate}
             onChange={onchangefilterDate} />
      <select value={filterStatus}
              onChange={onchangefilterStatus}>
        <option>すべて</option>
        <option>未着手</option>
        <option>進行中</option>
        <option>完了</option>
      </select>
    </div>
    <div>
      <div>
        <h2>TODO一覧</h2>
        <p>ID</p>
        <p>タイトル</p>
        <p>期限</p>
        <p>ステータス</p>
        <p>詳細</p>
        <p>操作</p>
      </div>

      <div className="todo-item">
        {filteredTodos.map((todo, index) => {
          return (
            <div key={todo.id}>
              <p>{todo.id}</p>
              <p>{todo.title}</p>
              <p>{todo.date}</p>
              <p>{todo.status}</p>
              <p>{todo.detail}</p>
              <button onClick={() => onClickEdit(index)}>編集</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          )
        })}
      </div>
    </div>

    <div className="edit-form">
      <h2>TODOを編集</h2>
      <input type="number"
             placeholder="IDを入力"
             value={editTodoId}
             onChange={onChangeEditTodoId} />
      <input type="text"
             placeholder="タイトルを入力"
             value={editTodoTitle}
             onChange={onChangeEditTodoTitle} />
      <input type="date"
             placeholder="期限を選択"
             value={editTodoDate}
             onChange={onChangeEditTodoDate} />
      <select value={editTodoStatus}
              onChange={onChangeEditTodoStatus}>
        <option>未着手</option>
        <option>進行中</option>
        <option>完了</option>
      </select>
      <textarea placeholder="動画見る"
                value={editTodoDetail}
                onChange={onChangeEditTodoDetail}></textarea>
      <button onClick={onClickSave}>保存</button>
      <button onClick={onClickCancel}>キャンセル</button>
    </div>
    </>
  )
};

export default App