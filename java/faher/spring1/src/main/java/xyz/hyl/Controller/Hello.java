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

@CrossOrigin(origins="*")
@Controller
public class Hello{
    public Pic p = new Pic();
    public DeviceInfo dInfo = new DeviceInfo();
    public final static String HOST = "localhost";
    public final static int PORT = 49990;
    ObjectMapper mapper = new ObjectMapper();


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

    @RequestMapping("/test/2")
    @ResponseBody
    public int test2(String deviceName, String pic, String info) throws IOException{
        if(this.p.deviceName == null || p.deviceName.size() == 0){
            this.p.deviceName = new ArrayList<>();
            this.p.pic = new ArrayList<>();
            this.p.result = new ArrayList<>();
            this.dInfo.deviceName = new ArrayList<>();
            this.dInfo.info = new ArrayList<>();
            this.p.deviceName.add(deviceName);
            this.p.pic.add(pic);
            ArrayList<String> temp = mapper.readValue(info,ArrayList.class);
            this.dInfo.deviceName.add(deviceName);
            this.dInfo.info.add(temp);

            int r = getResult(pic);
            this.p.result.add(r);
            return r;
        }



        int index = this.p.deviceName.indexOf(deviceName);
        if(index == -1){
            this.p.deviceName.add(deviceName);
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
            return r;
        }

    }

    @RequestMapping("test/obtain")
    @ResponseBody
    public String test3() throws JsonProcessingException {
        return this.mapper.writeValueAsString(this.p);

    }

    @RequestMapping("test/info")
    @ResponseBody
    public String test4() throws JsonProcessingException{
        return this.mapper.writeValueAsString(this.dInfo);
    }


    public int getResult(String pic) throws IOException{
        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(HOST, PORT));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
        bw.write(pic);
        bw.flush();
        socket.shutdownOutput();

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
