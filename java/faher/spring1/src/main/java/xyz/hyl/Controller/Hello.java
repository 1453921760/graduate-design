package xyz.hyl.Controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import xyz.hyl.Pojo.DeviceInfo;
import xyz.hyl.Pojo.Pic;

@CrossOrigin(origins="*")            //允许跨域请求 
@Controller
public class Hello{
    public Pic p = new Pic();                //保存图片 设备名称 识别结果
    public DeviceInfo dInfo = new DeviceInfo();   //保存 设备名称 设备信息
    public final static String HOST = "localhost";  //socket server的地址
    public final static int PORT = 49990;
    ObjectMapper mapper = new ObjectMapper();      //解析和生成json


    @RequestMapping("/test")
    public ModelAndView test(){

        ModelAndView mav =  new ModelAndView();
        mav.setViewName("index");
        return mav;
    }

    @RequestMapping("/test/1")               
    @ResponseBody
    public String test1(){
        System.out.println("wdnmd");
        return "nmd";
    }

    @RequestMapping("/test/2")                //处理图片 并将图片的结果存储(由edgexFoundry完成)
    @ResponseBody
    public int test2(String deviceName, String pic, String info) throws IOException{
        if(this.p.deviceName == null || p.deviceName.size() == 0){        //如果没有初始化则初始化, 也可以在外部初始化.不应该在这初始化
            this.p.deviceName = new ArrayList<>();
            this.p.pic = new ArrayList<>();
            this.p.result = new ArrayList<>();
            this.dInfo.deviceName = new ArrayList<>();
            this.dInfo.info = new ArrayList<>();
            this.p.deviceName.add(deviceName);                           
            this.p.pic.add(pic);
            ArrayList<String> temp = mapper.readValue(info,ArrayList.class);            //dInfo.info是一个二维数组, 前端接受时也要时二维数组
            this.dInfo.deviceName.add(deviceName);
            this.dInfo.info.add(temp);

            int r = getResult(pic);
            this.p.result.add(r);
            return r;
        }



        int index = this.p.deviceName.indexOf(deviceName);         //查找设备是否加入数据库中
        if(index == -1){
            this.p.deviceName.add(deviceName);             //如果设备没有添加, 则添加, 否则修改设备对应的图片以及结果
            this.p.pic.add(pic);
            int r = getResult(pic);
            ArrayList<String> temp = mapper.readValue(info,ArrayList.class);
            this.dInfo.deviceName.add(deviceName);
            this.dInfo.info.add(temp);


            this.p.result.add(r);
            return r;
        } else {
            this.p.pic.set(index, pic);
            int r = getResult(pic);
            this.p.result.set(index, r);
            return r;                                               //返回处理结果给设备
        }

    }

    @RequestMapping("test/obtain")                //前端请求, 获取设备名称 图片以及结果
    @ResponseBody
    public String test3() throws JsonProcessingException {
        return this.mapper.writeValueAsString(this.p);

    }

    @RequestMapping("test/info")                  //前端请求, 获取设备名称和支持的协议
    @ResponseBody
    public String test4() throws JsonProcessingException{
        return this.mapper.writeValueAsString(this.dInfo);
    }


    public int getResult(String pic) throws IOException{                  //通过socket请求python手势识别程序获取结果
        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(HOST, PORT));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream())); //将字节流转换为字符流, socket通过字节流进行传输.
        bw.write(pic);
        bw.flush();                                                          //刷新缓冲
        socket.shutdownOutput();                                            //不调用则socket server的recv会被阻塞.

        System.out.println("output finish");
        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        int result = br.read() - 48;
        System.out.println(result);
        br.close();
        bw.close();
        socket.close();


        return result;
    }
}
