import cv2
import numpy as np
import tensorflow as tf 
import socket 
import base64

HOST = 'localhost'
PORT = 49990

def create_model():#手势识别的cnn
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(16, 3, padding='same', activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Conv2D(32, 3, padding='same', activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(11,activation=tf.nn.softmax)])
    model.build(input_shape=(None, 50, 50, 3))
    model.compile(optimizer='Adam',
                    loss=tf.keras.losses.MSE,
                    metrics=['accuracy'])
   
    model_depth=len(model.layers)
    model_data_layer_index=[]
    n_data_layer=0
    for i in range(0,model_depth):
        if model.layers[i].get_weights()!=[]:
            n_data_layer+=1
            model_data_layer_index.append(i)
    model_data_layer_index=model_data_layer_index
    n_data_layer=n_data_layer
    return model

model = create_model()
image = cv2.imread("./2.png",1);
image = cv2.resize(image,dsize=(50,50), interpolation=cv2.INTER_CUBIC)
# # cv2.imshow("image",image)
# # cv2.waitKey(500)
# # cv2.destroyAllWindows()
b, g, r = cv2.split(image)
image = cv2.merge([r,g,b])
image = image / 255.0


def delIamge(baseImg):
    binarryImg = base64.decodebytes(baseImg)
    image = cv2.imdecode(np.array(bytearray(binarryImg), dtype='uint8'), cv2.IMREAD_UNCHANGED)
    image = cv2.resize(image,dsize=(50,50), interpolation=cv2.INTER_CUBIC)
    b, g, r = cv2.split(image)
    image = cv2.merge([r,g,b])
    image = image / 255.0
    x = np.zeros((1,50,50,3))
    x[0] = image
    ans=model.predict(x)#predict输出的是最后一层
    ans_index=np.argmax(ans)
    return ans_index

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(1)
while True:
    conn, addr = s.accept()
    print('connected!')
    zdata = ""
    while True:
        data = conn.recv(1024).decode('utf-8')
        if(len(data)==0):
            break;
        zdata += data
    
    print("recive the data")
    zdata = zdata.encode('utf-8')
    result = delIamge(zdata)
    print(result)
    #print(zdata)

    conn.send(str(result).encode('utf-8'))
    conn.shutdown(socket.SHUT_WR)
    conn.close()
