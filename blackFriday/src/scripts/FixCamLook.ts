import { Behaviour, GameObject, OrbitControls, serializable } from "@needle-tools/engine";
import { Euler, Quaternion, Vector2, Vector3 } from "three";

export class FixCamLook extends Behaviour{

    @serializable()
    amount: number = 1;

    private parentRotation = new Quaternion();

    onEnable(): void {
        this.parentRotation.copy(this.gameObject.parent!.quaternion);
        // this.parentRotation.premultiply(new Quaternion().setFromEuler(new Euler(0.0,0.0,0.3)));
    }

    private vec = new Vector3();
    private smoothPointer = new Vector2();
    update(): void {
        // get pointer coordinate inside window
        const pointer = this.context.input.mousePositionRC.clone();
        const signX = Math.sign(pointer.x);
        const signY = Math.sign(pointer.y);
        pointer.x = Math.sqrt(Math.abs(pointer.x)) * signX;
        pointer.y = Math.sqrt(Math.abs(pointer.y)) * signY;
        this.smoothPointer.lerp(pointer, this.context.time.smoothedDeltaTime * 2);

        const p = this.gameObject.parent!;
        p.quaternion.copy(this.parentRotation);
        p.rotateX(this.smoothPointer.y * this.amount);
        p.rotateOnWorldAxis(this.vec.set(0, 0, 1), this.smoothPointer.x * this.amount);
    }
}