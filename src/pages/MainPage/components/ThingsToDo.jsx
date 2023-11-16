function ThingsToDo() {
  return (
    <div className="main w-full">
      <ul className="w-full text-center font-extrabold text-3xl p-4">
        THINGS TO DO
        <div className="text-2xl text-left font-normal">
          <li className="text-blue-500">LOGIN/SIGNUP THINGS</li>
          <li className="line-through text-green-400">
            User is able to create his/her account with email and password
          </li>
          <li className="line-through text-green-400">
            User is able to login his/her credentials
          </li>
          <li className="text-blue-500">SIDEBAR THINGS</li>
          <li>
            ADD TOOLTIP ON HOVER
            https://www.flowbite-react.com/docs/components/tooltip
          </li>
          <li className="text-blue-500">CHANNEL THINGS</li>
          <li className="line-through text-green-400">
            User is able to create new channel
          </li>
          <li className="line-through text-green-400">
            User is able to add users on a channel
          </li>
          <li className="line-through text-green-400">
            User is able to SEE all channels
          </li>
          <li className="line-through text-green-400">
            Process flow: Click "+" then redirect, 1 input:name 1 select:members
            1 btn create channel, toast success then reload sidebar to show new
            channels
          </li>
          <li className="text-blue-500">MESSAGE THINGS</li>
          <li>User is able to send message to other user (Direct message)</li>
          <li>User is able to send message to a channel</li>
          <li>
            User is able to receive message from other user (Direct message)
          </li>
          <li>User is able to receive message from his/her channels</li>
        </div>
      </ul>
    </div>
  );
}

export default ThingsToDo;
