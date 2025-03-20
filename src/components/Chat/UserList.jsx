import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';

function UserList({ socket, roomId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('getUsers', roomId);

    socket.on('usersInRoom', (usersInRoom) => {
      setUsers(usersInRoom);
    });

    return () => {
      socket.off('usersInRoom');
    };
  }, [socket, roomId]);

  return (
    <div className={`${styles.userList} bg-light-lavender p-2 rounded-md mb-4`}>
      <h3 className="font-raleway text-deep-rose text-sm font-semibold mb-2">
        Users in Room ({users.length})
      </h3>
      <ul className="text-sm">
        {users.map((user) => (
          <li key={user.uid} className="text-gray-700">
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;