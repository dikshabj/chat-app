..message model..
senderid
receiverid
message

ankit(sender/receiver)--{hello}[message]
raj(receiver/sender)---{hi}[message]

--ab ye kam ese krega ki manlo ek bnda send kr rha h msg , fir use sender manege or ek receive kr rha h , use receiver manege or message ki alg id bnegi jo mongodb bna dega 
-- ab ye sb ko store krna pdega kahi kyuki sender or receiver ki ids bdlti rhegi cuz koi send krega to sender bn jega , receive krega to receiver bn jega 
-- inhe hm ek conversation model me store krege or wha pe hum senderid , receiverid or message ki id jo mongodb bnayega vo store krege
